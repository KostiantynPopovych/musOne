import { EditTwoTone, PlayCircleTwoTone } from '@ant-design/icons';
import { Fields } from 'components/organisms/editForm';
import download from 'downloadjs';
import React from 'react';

enum Action {
  play = 'play',
  edit = 'edit'
}

const TEXTS = {
  EDIT: 'Edit',
  EMPTY_DESCRIPTION: 'Upload tracks'
};

const getColumns = (action: (type: Action, record: Sound) => () => void) => [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Performer',
    dataIndex: 'performer'
  },
  {
    title: 'Album',
    dataIndex: 'album'
  },
  {
    title: 'Position',
    dataIndex: 'position'
  },
  {
    title: 'Year',
    dataIndex: 'year'
  },
  {
    key: 'action-edit',
    render: (_: string, record: Sound) => (
      <button onClick={action(Action.edit, record)}>
        <EditTwoTone />
      </button>
    )
  },
  {
    key: 'action-play',
    render: (_: string, record: Sound) => (
      <button onClick={action(Action.play, record)}>
        <PlayCircleTwoTone />
      </button>
    )
  }
];

const normalizeValues = ({ picture, ...rest }: Partial<Fields>, file: Blob) => {
  const fd = new FormData();
  fd.append('tracks', file);
  Object.entries(rest)
    .filter(([, value]) => !!value)
    .forEach(([key, value]) => {
      fd.append(key, value);
    });
  if (picture) {
    const pictureFile = new File([picture], 'cover', {
      type: picture.type
    });
    fd.append('pictures', pictureFile);
  }
  return fd;
};

const updateFile = async (formData: FormData, name: string) => {
  try {
    const response = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData
    });
    const blob = await response.blob();
    download(blob, name, 'audio/mpeg');
  } catch (e) {
    console.log(e);
  }
};

export { getColumns, TEXTS, Action, normalizeValues, updateFile };
