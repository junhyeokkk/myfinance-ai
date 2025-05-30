import React, { useState, type JSX } from 'react';
import '../style/dashboard.css'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  CreditCard, 
  PieChart, 
  Brain,
  AlertCircle,
  CheckCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Cell,
  Pie
} from 'recharts';

// Types
interface User {
  name: string;
  email: string;
  monthlyIncome: number;
  monthlyBudget: number;
}

interface SpendingData {
  month: string;
  amount: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface AIInsight {
  id: number;
  type: 'warning' | 'success' | 'tip';
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend: 'up' | 'down';
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

interface ProgressBarProps {
  label: string;
  current: number;
  max: number;
  color?: string;
}

interface InsightCardProps {
  insight: AIInsight;
}

// Mock data - 실제 프로젝트에서는 API에서 가져옵니다
const mockUser: User = {
  name: '김민수',
  email: 'minsu@example.com',
  monthlyIncome: 3500000,
  monthlyBudget: 3000000
};

const mockSpendingData: SpendingData[] = [
  { month: '1월', amount: 2800000 },
  { month: '2월', amount: 3200000 },
  { month: '3월', amount: 2900000 },
  { month: '4월', amount: 3100000 },
  { month: '5월', amount: 2750000 },
  { month: '6월', amount: 2950000 }
];

const mockCategoryData: CategoryData[] = [
  { name: '식비', value: 850000, color: '#8B5CF6' },
  { name: '교통비', value: 320000, color: '#10B981' },
  { name: '쇼핑', value: 680000, color: '#F59E0B' },
  { name: '유틸리티', value: 450000, color: '#EF4444' },
  { name: '엔터테인먼트', value: 380000, color: '#06B6D4' },
  { name: '기타', value: 270000, color: '#6B7280' }
];

const mockTransactions: Transaction[] = [
  { id: 1, description: '스타벅스 아메리카노', amount: 4500, category: '식비', date: '2024-05-29' },
  { id: 2, description: '지하철 교통카드 충전', amount: 50000, category: '교통비', date: '2024-05-28' },
  { id: 3, description: '온라인 쇼핑몰', amount: 89000, category: '쇼핑', date: '2024-05-27' },
  { id: 4, description: '전기요금', amount: 65000, category: '유틸리티', date: '2024-05-26' },
  { id: 5, description: '넷플릭스 구독료', amount: 17000, category: '엔터테인먼트', date: '2024-05-25' }
];

const mockAIInsights: AIInsight[] = [
  {
    id: 1,
    type: 'warning',
    title: '이번 달 식비 예산 초과 위험',
    content: '현재 식비 지출이 예산의 85%에 달했습니다. 남은 기간 동안 하루 평균 2만원 이하로 지출하세요.',
    priority: 'high'
  },
  {
    id: 2,
    type: 'success',
    title: '교통비 절약 성공!',
    content: '지난달 대비 교통비를 15% 절약했습니다. 대중교통 이용 패턴이 효율적입니다.',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'tip',
    title: '쇼핑 패턴 분석',
    content: '주말에 충동구매가 많습니다. 쇼핑 전 리스트를 작성하면 월 10만원 절약 가능합니다.',
    priority: 'low'
  }
];

export default function Dashboard(): JSX.Element {
  const [user] = useState<User>(mockUser);
  const [currentMonthSpending, setCurrentMonthSpending] = useState<number>(2750000);
  const [budgetProgress, setBudgetProgress] = useState<number>(92);
  const [savingsRate, setSavingsRate] = useState<number>(78);

  const totalIncome: number = user.monthlyIncome;
  const remainingBudget: number = user.monthlyBudget - currentMonthSpending;
  const savingsAmount: number = totalIncome - currentMonthSpending;
  const spendingChangePercent: number = -8.2; // 지난달 대비

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };

    return (
      <div className={`stat-card ${colorClasses[color]}`}>
        <div className="stat-header">
          <div className="stat-icon">
            <Icon size={24} />
          </div>
          <div className="stat-change">
            {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
              {change}%
            </span>
          </div>
        </div>
        <div className="stat-content">
          <h3 className="stat-title">{title}</h3>
          <p className="stat-value">{value}</p>
        </div>
      </div>
    );
  };

  const ProgressBar: React.FC<ProgressBarProps> = ({ label, current, max, color = '#8B5CF6' }) => {
    const percentage: number = (current / max) * 100;
    
    return (
      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          <span className="progress-value">{Math.round(percentage)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: color 
            }}
          />
        </div>
        <div className="progress-details">
          <span>{formatCurrency(current)}</span>
          <span>{formatCurrency(max)}</span>
        </div>
      </div>
    );
  };

  const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
    const getInsightIcon = (type: string): JSX.Element => {
      switch (type) {
        case 'warning': return <AlertCircle className="text-orange-500" size={20} />;
        case 'success': return <CheckCircle className="text-green-500" size={20} />;
        default: return <Brain className="text-blue-500" size={20} />;
      }
    };

    const getPriorityColor = (priority: string): string => {
      switch (priority) {
        case 'high': return 'border-l-red-500 bg-red-50';
        case 'medium': return 'border-l-orange-500 bg-orange-50';
        default: return 'border-l-blue-500 bg-blue-50';
      }
    };

    return (
      <div className={`insight-card ${getPriorityColor(insight.priority)}`}>
        <div className="insight-header">
          {getInsightIcon(insight.type)}
          <h4 className="insight-title">{insight.title}</h4>
        </div>
        <p className="insight-content">{insight.content}</p>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">안녕하세요, {user.name}님! 👋</h1>
          <p className="dashboard-subtitle">오늘도 똑똑한 소비 관리를 시작해보세요</p>
        </div>
        <div className="dashboard-date">
          <Calendar size={20} />
          <span>2024년 5월</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="이번 달 지출"
          value={formatCurrency(currentMonthSpending)}
          change={Math.abs(spendingChangePercent)}
          icon={CreditCard}
          trend={spendingChangePercent < 0 ? 'down' : 'up'}
          color="blue"
        />
        <StatCard
          title="남은 예산"
          value={formatCurrency(remainingBudget)}
          change={12.5}
          icon={Target}
          trend="up"
          color="green"
        />
        <StatCard
          title="이번 달 저축"
          value={formatCurrency(savingsAmount)}
          change={15.3}
          icon={TrendingUp}
          trend="up"
          color="purple"
        />
        <StatCard
          title="저축률"
          value={`${savingsRate}%`}
          change={5.2}
          icon={PieChart}
          trend="up"
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* 지출 트렌드 차트 */}
        <div className="chart-card">
          <div className="card-header">
            <h2 className="card-title">지출 트렌드</h2>
            <span className="card-subtitle">최근 6개월</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockSpendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis 
                  stroke="#9CA3AF"
                  tickFormatter={(value: number) => `${value/1000000}M`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), '지출액']}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 카테고리별 지출 */}
        <div className="chart-card">
          <div className="card-header">
            <h2 className="card-title">카테고리별 지출</h2>
            <span className="card-subtitle">이번 달</span>
          </div>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={mockCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {mockCategoryData.map((entry: CategoryData, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="category-legend">
              {mockCategoryData.map((category: CategoryData) => (
                <div key={category.name} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="legend-name">{category.name}</span>
                  <span className="legend-value">{formatCurrency(category.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 예산 진행률 */}
        <div className="progress-card">
          <div className="card-header">
            <h2 className="card-title">예산 현황</h2>
            <span className="card-subtitle">5월 진행률</span>
          </div>
          <div className="progress-content">
            <ProgressBar 
              label="전체 예산"
              current={currentMonthSpending}
              max={user.monthlyBudget}
              color="#8B5CF6"
            />
            <div className="category-progress">
              <ProgressBar 
                label="식비"
                current={850000}
                max={1000000}
                color="#F59E0B"
              />
              <ProgressBar 
                label="교통비"
                current={320000}
                max={400000}
                color="#10B981"
              />
              <ProgressBar 
                label="쇼핑"
                current={680000}
                max={800000}
                color="#EF4444"
              />
            </div>
          </div>
        </div>

        {/* AI 인사이트 */}
        <div className="insights-card">
          <div className="card-header">
            <h2 className="card-title">
              <Brain className="inline mr-2" size={20} />
              AI 코치 조언
            </h2>
            <span className="card-subtitle">맞춤 분석</span>
          </div>
          <div className="insights-content">
            {mockAIInsights.map((insight: AIInsight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>

        {/* 최근 거래내역 */}
        <div className="transactions-card">
          <div className="card-header">
            <h2 className="card-title">최근 거래내역</h2>
            <button className="view-all-btn">전체보기</button>
          </div>
          <div className="transactions-list">
            {mockTransactions.map((transaction: Transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4 className="transaction-description">{transaction.description}</h4>
                  <div className="transaction-meta">
                    <span className="transaction-category">{transaction.category}</span>
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                </div>
                <div className="transaction-amount">
                  -{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}