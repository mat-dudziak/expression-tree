import { Operator, ExpressionNode } from "../expession-tree";

describe('ExpressionNode', () => {
  const expressionNodeSet = [
    {
      left: 1,
      operator: '+' as Operator,
      right: 2,
      expectedResult: 3,
      expectedExpression: '(1 + 2)',
    },

    {
      left: 6,
      operator: '÷' as Operator,
      right: 3,
      expectedResult: 2,
      expectedExpression: '(6 ÷ 3)',
    },

    {
      left: 20,
      operator: '-' as Operator,
      right: 4,
      expectedResult: 16,
      expectedExpression: '(20 - 4)',
    },

    {
      left: 5,
      operator: 'x' as Operator,
      right: 4,
      expectedResult: 20,
      expectedExpression: '(5 x 4)',
    },
  ];

  it.each(expressionNodeSet)(
    'should generate expected arithmetic results and expressions',
    ({ left, operator, right, expectedResult, expectedExpression }) => {
      const t = new ExpressionNode(left, operator, right);

      expect(t.result()).toEqual(expectedResult);
      expect(t.toString()).toEqual(expectedExpression);
    },
  );

  it('should throw operator validation error',
    () => {
      const operator = '*' as Operator;
      expect(() => new ExpressionNode(1, operator, 2)).toThrowError(ExpressionNode['error'].invalidOperator(operator));
  });

  it('should throw operator validation error',
    () => {
      const leftNode = new ExpressionNode(1, '+', 1);
      const rightNode = new ExpressionNode(2, '+', 2);
      const node = new ExpressionNode(leftNode, '+', rightNode);
      expect(node['getLeftResult']()).toEqual(2);
      expect(node['getRightResult']()).toEqual(4);
      expect(node.result()).toEqual(6);
  });
});
