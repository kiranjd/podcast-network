import { getExtensionSettings } from 'shoutem.application/redux';
import { ext } from '../const';

export default function (state) {
  const settings = getExtensionSettings(state, ext());
  return {
    navigationBarImage: settings.backgroundImage,
    backgroundImageEnabledFirstScreen: settings.backgroundImageEnabledFirstScreen,
    showTitle: settings.showTitle,
  };
}
