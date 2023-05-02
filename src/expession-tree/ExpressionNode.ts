import { Left, Operator, Right, Expression, ExpressionNodeOperators } from './type';

export class ExpressionNode {
  constructor(private left: Left, private operator: Operator, private right: Right) {
    this.validateOperator();
  }

  private static error = {
    invalidOperator: (operator: Operator): Error => new Error(`Invalid operator '${operator}'`),
  }

  private operators: ExpressionNodeOperators = {
    '+': () => this.getLeftResult() + this.getRightResult(),
    '-': () => this.getLeftResult() - this.getRightResult(),
    'x': () => this.getLeftResult() * this.getRightResult(),
    '÷': () => this.getLeftResult() / this.getRightResult(),
  };

  private validateOperator = (): void => {
    if (!this.operators[this.operator]) {
      throw ExpressionNode.error.invalidOperator(this.operator);
    }
  };

  private getLeftResult = (): number => (this.left instanceof ExpressionNode ? this.left.result() : this.left);

  private getRightResult = (): number => (this.right instanceof ExpressionNode ? this.right.result() : this.right);

  public toString = (): Expression => `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;

  public result = (): number => this.operators[this.operator]();
}
