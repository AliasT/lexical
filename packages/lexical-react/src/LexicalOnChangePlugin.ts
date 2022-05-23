/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {EditorState, LexicalEditor} from 'lexical';

import useLayoutEffect from 'shared-ts/useLayoutEffect';

import {useLexicalComposerContext} from './LexicalComposerContext';

export function OnChangePlugin({
  ignoreInitialChange = true,
  ignoreSelectionChange = false,
  onChange,
}: {
  ignoreInitialChange?: boolean;
  ignoreSelectionChange?: boolean;
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
}): null {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    if (onChange) {
      return editor.registerUpdateListener(
        ({editorState, dirtyElements, dirtyLeaves, prevEditorState}) => {
          if (
            ignoreSelectionChange &&
            dirtyElements.size === 0 &&
            dirtyLeaves.size === 0
          ) {
            return;
          }

          if (ignoreInitialChange && prevEditorState.isEmpty()) {
            return;
          }

          onChange(editorState, editor);
        },
      );
    }
  }, [editor, ignoreInitialChange, ignoreSelectionChange, onChange]);

  return null;
}