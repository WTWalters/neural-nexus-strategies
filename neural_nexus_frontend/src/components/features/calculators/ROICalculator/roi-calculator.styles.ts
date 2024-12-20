// src/components/features/calculators/roi-calculator/roi-calculator.styles.ts
import styled from "styled-components";

export const StyledCalculator = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
  max-width: 480px;
`;

export const ResultDisplay = styled.div`
  padding: var(--spacing-4);
  background: var(--color-navy-50);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-4);
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`;
