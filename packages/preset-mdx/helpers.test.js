const helpers = require('./helpers');

describe('helpers', () => {
  describe('isInvalidNewLine', () => {
    it('returns true for the text node with a newline for empty story', () => {
      const node = {
        type: 'text',
        value: '\n',
      };

      const currentStory = {
        children: [],
      };

      const result = helpers.isInvalidNewLine(node, currentStory);

      expect(result).toBeTruthy();
    });

    it('returns false for the text node with a newline for not an empty story', () => {
      const node = {
        type: 'text',
        value: '\n',
      };

      const currentStory = {
        children: ['thing'],
      };

      const result = helpers.isInvalidNewLine(node, currentStory);

      expect(result).toBeFalsy();
    });

    it('returns false for the any node with for an empty story', () => {
      const node = {
        type: 'foo',
        value: 'bar',
      };

      const currentStory = {
        children: [],
      };

      const result = helpers.isInvalidNewLine(node, currentStory);

      expect(result).toBeFalsy();
    });
  });

  describe('getHeadingText', () => {
    it('gets text of the node recursively', () => {
      const node = {
        children: [
          {
            type: 'text',
            value: 'The ',
          },
          {
            children: [
              {
                type: 'text',
                value: 'quick',
              },
              {
                type: 'text',
                value: ' brown ',
              },
            ],
          },
          {
            children: [
              {
                type: 'text',
                value: 'fox',
              },
              {
                children: [
                  {
                    type: 'text',
                    value: 'jumps',
                  },
                  {
                    children: [
                      {
                        type: 'text',
                        value: 'over',
                      },
                      {
                        children: [
                          {
                            type: 'text',
                            value: 'the',
                          },
                          {
                            type: 'text',
                            value: 'lazy',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'dog',
          },
        ],
      };

      const result = helpers.getHeadingText(node);

      expect(result).toEqual('The quick brown fox jumps over the lazy dog');
    });
  });

  describe('getDefaultStoryKind', () => {
    const options = { filepath: 'foo/bar/baz/file.mdx' };

    it('returns basename of the file path when "defaultStoryKind" is not defined', () => {
      const result = helpers.getDefaultStoryKind(undefined, options);
      expect(result).toEqual('file.mdx');
    });

    it('returns basename of the file path when "defaultStoryKind" is not a function', () => {
      const mdxOptions = {
        defaultStoryKind: 'default story kind',
      };

      const result = helpers.getDefaultStoryKind(mdxOptions, options);
      expect(result).toEqual('file.mdx');
    });

    it('returns the result of "defaultStoryKind()" when it is a function', () => {
      const mdxOptions = {
        defaultStoryKind: ({ filepath }) => filepath,
      };

      const result = helpers.getDefaultStoryKind(mdxOptions, options);
      expect(result).toEqual('foo/bar/baz/file.mdx');
    });
  });

  describe('getDefaultStoryName', () => {
    const options = { filepath: 'foo/bar/baz/file.mdx' };

    it('returns "Default" when "defaultStoryName" is not defined', () => {
      const result = helpers.getDefaultStoryName(undefined, options);
      expect(result).toEqual('Default');
    });

    it('returns "Default" path when "defaultStoryName" is invalid', () => {
      const mdxOptions = {
        defaultStoryName: 8,
      };

      const result = helpers.getDefaultStoryName(mdxOptions, options);
      expect(result).toEqual('Default');
    });

    it('returns the value of "defaultStoryName" when it is a string', () => {
      const mdxOptions = {
        defaultStoryName: 'FooBar',
      };

      const result = helpers.getDefaultStoryName(mdxOptions, options);
      expect(result).toEqual('FooBar');
    });

    it('returns the result of "defaultStoryName()" when it is a function', () => {
      const mdxOptions = {
        defaultStoryName: ({ filepath }) => filepath,
      };

      const result = helpers.getDefaultStoryName(mdxOptions, options);
      expect(result).toEqual('foo/bar/baz/file.mdx');
    });
  });

  describe('isStorybookAnnotation', () => {
    it('should be false when there is no value', () => {
      const value = '';

      const result = helpers.isStorybookAnnotation({ value });

      expect(result).toBeFalsy();
    });

    it('should be false when it does not match a pattern', () => {
      const value = 'some text';

      const result = helpers.isStorybookAnnotation({ value });

      expect(result).toBeFalsy();
    });

    it('should be false when it is not storybook comment', () => {
      const value = '<!-- foo = bar -->';

      const result = helpers.isStorybookAnnotation({ value });

      expect(result).toBeFalsy();
    });

    it('should be true when it is storyKind comment', () => {
      const value = '<!-- storyKind = foo -->';

      const result = helpers.isStorybookAnnotation({ value });

      expect(result).toBeTruthy();
    });

    it('should be true when it is storyName comment', () => {
      const value = '<!-- storyName = foo -->';

      const result = helpers.isStorybookAnnotation({ value });

      expect(result).toBeTruthy();
    });

    it('should be true when it is valid comment with many spaces', () => {
      const value = '<!--   storyName    =    foo     -->';

      const result = helpers.isStorybookAnnotation({ value });

      expect(result).toBeTruthy();
    });
  });
});
