const breakpointsConfig = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

let up = {};

Object.keys(breakpointsConfig).forEach((bpKey) => {
  up[bpKey] = `only screen and (min-width: ${breakpointsConfig[bpKey]}px)`;
});

let breakpoints = {
  up,
};

export default breakpoints;
