import { ExpressionNode } from './ExpressionNode';
import { Node, Expression } from './type';

export class ExpressionTree {
  constructor(private expression: Node) {}

  private left = this.expression[0];

  private operator = this.expression[1];

  private right = this.expression[2];

  private getLeftInput = (): number => Array.isArray(this.left) ? new ExpressionTree(this.left).result() : this.left;

  private getRightInput = (): number =>
    Array.isArray(this.right) ? new ExpressionTree(this.right).result() : this.right;

  public toString = (): Expression => {
    const leftExpression = Array.isArray(this.left)
      ? new ExpressionTree(this.left).toString()
      : this.left.toString();

    const rightExpression = Array.isArray(this.right)
      ? new ExpressionTree(this.right).toString()
      : this.right.toString();

    return `(${leftExpression} ${this.operator} ${rightExpression})`;
  };

  public nodeTest = (): ExpressionNode => new ExpressionNode(this.getLeftInput(), this.operator, this.getRightInput());

  public result = (): number => this.nodeTest().result();
}
