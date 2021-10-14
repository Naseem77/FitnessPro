import styled from 'styled-components';

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 350px; /*fixing a bug where if the user have a small text style will go wrong changed from '100%'*/
    margin-bottom: 15px;
    border-radius: 10px;
`;

export const RecipesImg = styled.Image`
    width: 150px;
    height: 110px;
    border-radius: 25px;
`;

export const RecipeInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
`;

export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
  /*  font-family: 'Lato-Bold';*/
    font-weight: bold;
    color: #2e64e5;
`;