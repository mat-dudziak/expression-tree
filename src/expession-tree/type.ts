import { type ExpressionNode } from './ExpressionNode';

export type Expression = `(${string} ${Operator} ${string})`;
export type Left = Value | ExpressionNode;
export type Right = Left;
export type Operator = '+' | '-' | 'x' | '÷';

export type ExpressionNodeOperators = {
  [key in Operator]: () => number;
}

export type Value = number;
export type LeftExpression = Value | Node;

export type RightExpression = LeftExpression;
export type Node = [LeftExpression, Operator, RightExpression];
