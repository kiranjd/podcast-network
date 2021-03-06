import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, FormGroup } from 'react-bootstrap';
import i18next from 'i18next';
import { Switch } from '@shoutem/react-web-ui';
import form from '../common/form';
import ShortcutsTable from '../../components/shortcuts-table';
import ShortcutBackgroundRow from '../../components/shortcut-background-row';
import LOCALIZATION from './iconBackgroundSettingsLocalization';

export class IconsBackgroundSettings extends Component {
  constructor(props) {
    super(props);

    this.saveForm = this.saveForm.bind(this);
    this.renderShortcutRow = this.renderShortcutRow.bind(this);

    props.onFieldChange(this.saveForm);
  }

  saveForm() {
    const newSettings = this.props.form.toObject();
    this.props.onSettingsChanged(newSettings);
  }

  renderShortcutRow(shortcut) {
    const { onIconChanged, normalIconUrl } = this.props;
    return (
      <ShortcutBackgroundRow
        title={shortcut.title}
        shortcutType={shortcut.shortcutType}
        normalIconUrl={_.get(shortcut, normalIconUrl)}
        shortcutId={shortcut.id}
        onIconSelected={onIconChanged}
      />
    );
  }

  render() {
    const { fields, shortcuts } = this.props;
    const { backgroundImagesEnabled } = fields;

    return (
      <div>
        <form>
          <Row>
            <Col md={8}>
              <h3>{i18next.t(LOCALIZATION.TITLE)}</h3>
            </Col>
            <Col md={4}>
              <div className="icon-backgrounds__switch">
                <Switch {...backgroundImagesEnabled} />
              </div>
            </Col>
          </Row>
          {backgroundImagesEnabled.value && (
            <Row>
              <Col md={12}>
                <FormGroup>
                  <ShortcutsTable
                    shortcuts={shortcuts}
                    headerTitles={[
                      i18next.t(LOCALIZATION.HEADER_ICON_BACKGROUNDS),
                      i18next.t(LOCALIZATION.HEADER_NORMAL),
                    ]}
                    renderRow={this.renderShortcutRow}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
        </form>
      </div>
    );
  }
}

IconsBackgroundSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onIconChanged: PropTypes.func.isRequired,
  onSettingsChanged: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
  form: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string),
  shortcuts: PropTypes.array,
  normalIconUrl: PropTypes.string,
};

export default form(props => {
  const { settings } = props;
  return {
    fields: ['backgroundImagesEnabled'],
    defaultValues: {
      backgroundImagesEnabled: settings.backgroundImagesEnabled,
    },
    validation: {},
  };
})(IconsBackgroundSettings);
