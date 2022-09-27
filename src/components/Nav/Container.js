import styled from 'styled-components';

const Container = styled.div`
  margin-left: ${props => props.viewmenu ? '15em' : '15px'};
  margin-right: 15px;
  
  @media(max-width: 970px) {
    margin-left: ${props => props.viewmenu ? '15px' : '15em'};
  }
`;
export default Container
