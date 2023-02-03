import { compose, setDisplayName } from 'recompose';
import { reduxForm } from 'redux-form';

import EditForm, { Inner, Outer } from './editForm';

export interface Fields {
  name: string;
  album: string;
  picture: Blob;
  year: string;
  performer: string;
  style: string;
  position: string;
}

export default compose<Inner, Outer>(
  setDisplayName('EditForm'),
  reduxForm({
    form: 'EDIT_FORM',
    enableReinitialize: true
  })
)(EditForm);
