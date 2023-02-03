import { isRequired } from 'utils/validators';

const TEXTS = {
  NAME: 'Name',
  PERFORMER: 'Performer',
  ALBUM: 'Album',
  POSITION: 'Position',
  YEAR: 'Year',
  STYLE: 'Style'
};

const getFields = (isPartial?: boolean) => [
  ...(!isPartial
    ? [
        {
          name: 'name',
          label: TEXTS.NAME,
          placeholder: TEXTS.NAME,
          validate: isRequired
        }
      ]
    : []),
  {
    name: 'performer',
    label: TEXTS.PERFORMER,
    placeholder: TEXTS.PERFORMER
  },
  {
    name: 'album',
    label: TEXTS.ALBUM,
    placeholder: TEXTS.ALBUM
  },
  ...(!isPartial
    ? [
        {
          name: 'position',
          label: TEXTS.POSITION,
          placeholder: TEXTS.POSITION
        }
      ]
    : []),
  {
    name: 'year',
    label: TEXTS.YEAR,
    placeholder: TEXTS.YEAR
  },
  {
    name: 'style',
    label: TEXTS.STYLE,
    placeholder: TEXTS.STYLE
  }
];

export { getFields };
