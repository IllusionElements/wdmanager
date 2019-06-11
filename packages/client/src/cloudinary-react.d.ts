/*~ On this line, import the module which this module adds to */

// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module plugin template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

declare module "cloudinary-react" {
  class CloudinaryComponent<P> {
    constructor(props: P, context) {}

    getChildContext() {}

    render() {}

    getChildTransformations(children) {}

    getTransformations() {}

    normalizeOptions(...options) {}

    getURL(extendedProps) {}

    typesFrom(configParams) {}
  }

  export class CloudinaryContext extends CloudinaryComponent {
    constructor(props, context) {}

    getChildContext() {}

    render() {}
  }

  export class Image extends CloudinaryComponent {
    constructor(props, context) {}

    render() {}

    get window() {}

    componentWillRecieveProps() {}

    prepareState() {}

    handleResize(e) {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillUpdate() {}

    findContainerWidth() {}

    applyBreakpoints(width, steps, options) {}

    calc_breakpoint(width, steps) {}

    device_pixel_ratio(roundDpr) {}

    updateDpr(dataSrc) {}

    maxWidth(requiredWidth) {}

    cloudinary_update(url, options) {}
  }

  export class Transformation extends CloudinaryComponent {
    constructor(props) {}

    render() {}
  }

  export class Video extends CloudinaryComponent {
    constructor(props) {}

    render() {}
  }
}
