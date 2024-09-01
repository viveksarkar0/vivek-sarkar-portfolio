import styled from "styled-components";

// Define the types for the props
interface GridProps {
  columns?: number; // Optional, defaults to 12 if not provided
  gap?: string; // Optional, defaults to "1rem" if not provided
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.columns ? props.columns : 12)},
    1fr
  );
  grid-gap: ${(props) => (props.gap ? props.gap : "1rem")};
`;
