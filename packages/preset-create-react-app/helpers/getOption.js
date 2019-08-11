const getOption = (options, name) =>
  options.presetCreateReactApp && options.presetCreateReactApp[name];

module.exports = getOption;
