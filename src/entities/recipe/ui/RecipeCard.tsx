import styled from "styled-components";
import { T } from "@admiral-ds/react-ui";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../model/types";

const Card = styled.button`
  display: grid;
  grid-template-rows: 160px auto;
  border: none;
  background: var(--admiral-color-Neutral_Neutral05);
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  padding: 0;
  &:hover {
    outline: 2px solid var(--admiral-color-Primary_Primary60);
  }
`;
const Img = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;
const Body = styled.div`
  padding: 12px;
  display: grid;
  gap: 4px;
`;

export function RecipeCard({ r }: { r: Recipe }) {
  const nav = useNavigate();
  return (
    <Card onClick={() => nav(`/recipe/${r.id}`)}>
      <Img src={r.cover} alt={r.title} />
      <Body>
        <T font="Body/Body 1 Long">{r.title}</T>
        <T font="Caption/Caption 1">{r.short}</T>
        <T font="Caption/Caption 1">
          ⏱ {r.timeMin} мин • {r.tags.join(", ")}
        </T>
      </Body>
    </Card>
  );
}
