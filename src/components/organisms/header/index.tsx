import { Button, PageHeader } from 'antd';
import PlateIcon from 'assets/icon/plate.png';
import 'mutag/dist/mutag.min';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SoundsActions } from 'store/sounds/actions';

import { normalizeFiles, TEXTS } from './config';

const Header = () => {
  const inputRef = useRef<Nullable<HTMLInputElement>>(null);

  const dispatch = useDispatch();

  const handleUploadClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleSelectFiles = useCallback(
    async ({ target: { files } }) => {
      if (!files.length) return;
      const normalized = await normalizeFiles(files);
      dispatch(SoundsActions.setSounds(normalized));
    },
    [dispatch]
  );

  return (
    <>
      <input
        multiple
        hidden
        accept="audio/mpeg"
        onChange={handleSelectFiles}
        type="file"
        ref={inputRef}
      />
      <PageHeader
        avatar={useMemo(
          () => ({
            src: PlateIcon
          }),
          []
        )}
        title={TEXTS.TITLE}
        extra={<Button onClick={handleUploadClick}>{TEXTS.UPLOAD}</Button>}
      />
    </>
  );
};

export default memo(Header);
