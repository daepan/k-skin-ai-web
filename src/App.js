import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import './App.css';

// 스타일드 컴포넌트 정의
const Logo = styled.h1`
  color: #007bff;
  font-family: Arial, sans-serif;
  margin: 10px 0;
`;

const DropZone = styled.div`
  height: 200px;
  width: 300px;
  border: 2px dashed #007bff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 20px auto;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;


function App() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref 생성

  const handleDrop = (e) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]); // 파일 처리 함수 분리
  };

  const processFile = (file) => { // 파일 처리 로직을 별도 함수로 분리
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // 파일 입력 클릭 시뮬레이션
  };

  return (
    <div className="App">
      <header className="App-header">
        <Logo>K-SKIN-AI</Logo>
        <DropZone onClick={handleClick} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          Drag & Drop your image here or Click to select
        </DropZone>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} // input을 숨깁니다
          accept="image/*" // 오직 이미지 파일만 선택 가능
        />
        {image && <ImagePreview src={image} alt="Preview" />}
        {image && <UploadButton>전송</UploadButton>}
      </header>
    </div>
  );
}

export default App;
