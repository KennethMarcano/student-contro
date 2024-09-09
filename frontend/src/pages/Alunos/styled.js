import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h1`  
  text-align: center;  
  margin-bottom: 20px;  
  color: #333;  
`;  

export const AlunosContainer = styled.div`  
  display: flex;  
  flex-direction: column;  
`;  

export const AlunoCard = styled.div`  
  display: flex;  
  align-items: center;  
  justify-content: center; 
  gap: 20px;
  padding: 15px;  
  border: 1px solid #eee;  
  border-radius: 5px;  
  margin-bottom: 15px;  
  transition: background 0.3s;  
  
  &:hover {  
    background: #f0f0f0;  
  }
  @media (max-width: 605px) {
    flex-direction: column;
    gap: 10px;
  }
`;  

export const AlunoInfo = styled.div`  
  display: flex; 
  gap: 20px; 
  align-items: center;
  @media (max-width: 605px) {
    flex-direction: column;
  }
`;  

export const AlunoImage = styled.img`  
  width: 50px;  
  height: 50px;  
  border-radius: 50%;  
  object-fit: cover;  
  margin-right: 15px;  
`;  

export const AlunoDetails = styled.div`  
  display: flex;
  gap: 20px;
  @media (max-width: 605px) {
    flex-direction: column;
    align-items: center; 
  }
`;  

export const ActionsContainer = styled.div`  
  display: flex;  
`;  

export const ActionButton = styled(Link)` 
    align-self: center;
  background: transparent;  
  border: none;  
  cursor: pointer;  
  margin-left: 10px;  
  transition: all 0.3s;  
`;  
