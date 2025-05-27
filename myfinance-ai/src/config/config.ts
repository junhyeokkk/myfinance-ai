import dotenv from 'dotenv';
dotenv.config();

const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`${key} 환경 변수가 정의되어 있지 않습니다.`);
    return value;
};

// accessExpire, refreshExpire 초기 '15m', '7d' 이값만 지정 --> sign 메서드에서 컴파일 에러 발생 
/* 원인 : 
 config.jwt.accessExpire = '15m' 처럼 변수에 할당하면 기본적으로 string 타입으로 추론됨
 그런데 jsonwebtoken의 expiresIn 옵션은 string | number 타입을 받긴 하지만, 
 TypeScript가 일부 내부 오버로드에서 구체적인 리터럴 타입 (예: '15m', '7d' 등)을 기대할 때가 있어서
 단순 string 타입은 불명확하다고 판단해서 타입 에러가 발생
*/
// 해결 => as const로 정확한 상수 리터럴 타입으로 지정해줌으로써 에러 해결 

export const config = {
    jwt: {
        secret: getEnv('JWT_SECRET'),
        accessExpire: '15m' as const,     
        refreshExpire: '7d' as const,      
    },
    // 여기에 다른 환경변수도 추가 가능
    // db: { uri: getEnv('DB_URI') },
};
