import { ExpressionTree, Node, Expression } from '../expession-tree';

type ExpressionTreeSet = {
  input: Node,
  expectedResult: number,
  expectedExpression: Expression
}[];

describe('ExpressionTree', () => {
  const expressionTreeSet: ExpressionTreeSet = [
    {
      input : [[5, '-', 2], 'x', 5],
      expectedResult: 15,
      expectedExpression: '((5 - 2) x 5)',
    },

    {
      input: [
        [
          7,
          '+',
          [
            [3, '-', 2],
            'x',
            5,
          ],
        ],
        '÷',
        6
      ],
      expectedResult: 2,
      expectedExpression: '((7 + ((3 - 2) x 5)) ÷ 6)',
    },

    {
      input: [
        [
          [6, '+', 1],
          '+',
          [
            [3, '-', 2],
            'x',
            5,
          ],
        ],
        '÷',
        [
          3,
          '+',
          [2, '+', 1]
        ]
      ],
      expectedResult: 2,
      expectedExpression: '(((6 + 1) + ((3 - 2) x 5)) ÷ (3 + (2 + 1)))',
    },

    {
      input: [
        [
          [6, '+', 1],
          '+',
          [
            [3, '-', 2],
            'x',
            5,
          ],
        ],
        '÷',
        [
          [9, '÷', 3],
          '+',
          [2, '+', 1]
        ]
      ],
      expectedResult: 2,
      expectedExpression: '(((6 + 1) + ((3 - 2) x 5)) ÷ ((9 ÷ 3) + (2 + 1)))',
    },
  ];

  it.each(expressionTreeSet)(
    'should generate expected arithmetic results and expressions',
    ({ input, expectedResult, expectedExpression }) => {
      const stack = new ExpressionTree(input);

      expect(stack.result()).toEqual(expectedResult);

      expect(stack.toString()).toEqual(expectedExpression);
  });
});
