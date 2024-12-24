const processImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("http://localhost:8080/api/image/test", { // py서버 주소를 알려주면 그걸로 바꾸면 됨 ㅋㅋ
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    // HTTP 응답 상태가 성공(2xx)이 아닌 경우 에러 처리
    const errorData = await response.json();
    throw new Error(errorData.message || "이미지 처리 실패");
  }

  const data = await response.json();
  const { fileInfo } = data; // 응답 구조에 맞춰서 얘도 바뀨ㅝ주ㅝ야함
  return fileInfo;
};

export default { processImage };
