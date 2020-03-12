import babel from '@babel/core';
export default function plugin({ types: t }: typeof babel): babel.PluginObj {
  return {
    visitor: {
      Program(path) {
        const directive = path.get('directives.0') as babel.NodePath<
          babel.types.Directive
        >;
        if (!directive || directive.node.value.value !== 'untransformed') {
          return;
        }

        const body = path.get('body');

        path.replaceWith(
          t.program([
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier('React'),
                  t.identifier('createElement')
                ),
                [
                  t.functionExpression(
                    t.identifier(''),
                    [],
                    t.blockStatement(
                      body.map(function({ node }) {
                        if (
                          t.isExpressionStatement(node) &&
                          t.isJSXElement(
                            (node as babel.types.ExpressionStatement).expression
                          )
                        ) {
                          return t.returnStatement(
                            (node as babel.types.ExpressionStatement).expression
                          );
                        }
                        return node;
                      })
                    )
                  )
                ]
              )
            )
          ])
        );
      }
    }
  };
}
