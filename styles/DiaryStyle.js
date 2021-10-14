import styled from 'styled-components';

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 350px; /*fixing a bug where if the user have a small text style will go wrong changed from '100%'*/
    margin-bottom: 20px;
    border-radius: 10px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding-left: 20px;
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    margin-bottom: 5px;
    margin-left: 200px;
     padding: 1px 1px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;