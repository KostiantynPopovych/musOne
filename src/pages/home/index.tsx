import { Button, Drawer, Empty, Table } from 'antd';
import SpeakerIcon from 'assets/icon/speaker.png';
import EditForm, { Fields } from 'components/organisms/editForm';
import React, { memo, useCallback, useMemo, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { SoundsActions } from 'store/sounds/actions';
import SoundsSelectors from 'store/sounds/selectors';

import {
  Action,
  getColumns,
  normalizeValues,
  TEXTS,
  updateFile
} from './config';
import sm from './styles.module.scss';

const defaultSelectedRows = { keys: [], items: [] };

const emptyControls: [] = [];

const Home = () => {
  const sounds = useSelector(SoundsSelectors.getSounds);

  const [playing, setPlaying] = useState();

  const selected = useSelector(SoundsSelectors.getSelectedSounds);

  const initialFormValues = useMemo(
    () =>
      Array.isArray(selected)
        ? undefined
        : {
            name: selected?.name,
            album: selected?.album,
            picture: selected?.picture,
            year: selected?.year,
            performer: selected?.performer,
            style: selected?.style,
            position: selected?.position
          },
    [selected]
  );

  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState<typeof defaultSelectedRows>(
    defaultSelectedRows
  );

  const handleSelectRow = useCallback((keys, items) => {
    setSelectedRows({ keys, items });
  }, []);

  const handlePlayClick = useCallback((record: Sound) => {
    setPlaying(URL.createObjectURL(record.file));
  }, []);

  const handleEditClick = useCallback(
    (record: Sound) => {
      setSelectedRows(defaultSelectedRows);
      dispatch(SoundsActions.setSelected(record));
    },
    [dispatch]
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedRows(defaultSelectedRows);
    dispatch(SoundsActions.setSelected());
  }, [dispatch]);

  const handleActionClick = useCallback(
    (type: Action, record: Sound) => () => {
      switch (type) {
        case Action.edit:
          handleEditClick(record);
          break;
        case Action.play:
          handlePlayClick(record);
          break;
        default:
          break;
      }
    },
    [handleEditClick, handlePlayClick]
  );

  const handleEditManyClick = useCallback(() => {
    dispatch(SoundsActions.setSelected(selectedRows.items));
  }, [dispatch, selectedRows]);

  const handleSubmitForm = useCallback(
    async (values: Fields) => {
      if (Array.isArray(selected)) {
        await Promise.all(
          selected.map(e => {
            const formData = normalizeValues(values, e.file);
            return updateFile(formData, `${e.performer} - ${e.name}.mp3`);
          })
        );
        const updated = sounds?.map(sound => {
          if (selected.some(e => e.id === sound.id)) {
            return {
              ...sound,
              ...values
            };
          }
          return sound;
        });
        dispatch(SoundsActions.setSounds(updated));
      } else {
        const formData = normalizeValues(values, (selected as Sound).file);
        await updateFile(
          formData,
          `${selected?.performer} - ${selected?.name}.mp3`
        );
        const updated = sounds?.map(sound =>
          selected?.id === sound.id ? { ...selected, ...values } : sound
        );
        dispatch(SoundsActions.setSounds(updated as Sound[]));
      }
      handleCloseDrawer();
    },
    [dispatch, handleCloseDrawer, selected, sounds]
  );

  return sounds ? (
    <div className={sm.Wrap}>
      <>
        <div className={sm.Wrap_Table}>
          <Button
            onClick={handleEditManyClick}
            className={sm.Wrap_Table_Edit}
            type="dashed"
            disabled={!selectedRows.items.length}
          >
            {TEXTS.EDIT}
          </Button>
          <Table
            rowKey="id"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedRows.keys,
              onChange: handleSelectRow
            }}
            pagination={false}
            dataSource={sounds}
            columns={getColumns(handleActionClick)}
          />
        </div>
        <Drawer
          visible={!!selected}
          placement="right"
          width={400}
          closable={false}
          onClose={handleCloseDrawer}
        >
          <div className={sm.Wrap_SideBar}>
            <EditForm
              isPartial={Array.isArray(selected)}
              onSubmit={handleSubmitForm}
              initialValues={initialFormValues}
            />
          </div>
        </Drawer>
      </>
      <div className={sm.Wrap_Player}>
        <AudioPlayer
          layout="horizontal"
          src={playing}
          customAdditionalControls={emptyControls}
        />
      </div>
    </div>
  ) : (
    <div className={sm.EmptyWrap}>
      <Empty image={SpeakerIcon} description={TEXTS.EMPTY_DESCRIPTION} />
    </div>
  );
};

export default memo(Home);
