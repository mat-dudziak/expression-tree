import { ExpressionTree, Node } from "../expession-tree";

describe('ExpressionTree', () => {
  const expressionTreeSet = [
    {
      input: [[5, '-', 2], 'x', 5] as Node,
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
      ] as Node,
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
      ] as Node,
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
      ] as Node,
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
