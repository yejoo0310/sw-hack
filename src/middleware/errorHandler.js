const errorHandler = (err, req, res, next) => {
  // 에러 메시지 로그 출력
  console.error("에러 발생:", err.message);

  // 클라이언트로 에러 메시지 전송
  res.status(400).json({ message: err.message });
};

export default errorHandler;
