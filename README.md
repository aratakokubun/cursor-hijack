[![Build Status](https://travis-ci.org/aratakokubun/cursor-hijack.svg?branch=master)](https://travis-ci.org/aratakokubun/cursor-hijack)
[![Dependency Status](https://gemnasium.com/badges/github.com/aratakokubun/cursor-hijack.svg)](https://gemnasium.com/github.com/aratakokubun/cursor-hijack)

# cursor-hijack

Library to hijack cursor and control it!

## What is cursor-hijack?　Why use cursor-hijack?

Cursor-hijack is react based library to enable hijack cursor and control it.

You can create more attractive application with this library.

See [demo page](https://cursor-hijack-demo.appspot.com/demo)

## How to use cursor-hijack?

  1. install cursor-hijack with npm

    npm install cursor-hijack --save

  2. Add 2 react components to your application.

      You need to pass function to CursorHijackOverlay to get Refs under application.
      
      ```app.js(for exapmle)
        // Import components from cursor-hijack
        import cjk from 'cursor-hijack';
        ...

        // Pass function to get refs under app.js
        const getAppRefs = () => (this.refs)

        ...
        const render = () => {
          return
            <div>
              <cjk.PseudoCursor />
              <cjk.CursorHijackOverlay
                getAppRefs={this.getAppRefs} />
              <!-- other components -->
              <Component1 />
              <Component2 />
              ...
            <div>
        }
        ...
      ```

  3. Put refs tags for components inside.

      This library search elements with ref tag to dispatch event.
      In app.js and same manner for all child components.
    
      ```
        ...
        <div>
          <ChildComponent1 ref="child1"> Good! </ChildComponent1>
          <ChildComponent2> Bad! You should not do this! </ChildComponent2>
          <button ref="button1"> Good! </button>
          <div>
            <ChildComponent3 ref="child3"> Good! </ChildComponent3>
            <button ref="button2"> Good! </button>
          </div>
        </div>
        ...
      ```

      To add to this, you need to specify { withRef: true } for comoponets which use connect.
      ```
        connect(mapStateFunc, mapDispatchFunc, mergeFunc, { withRef: true } /*Need option*/)(Component1)
      ```

  4. Create store for cursor-hijack reducers
      
      ```
      let store = createStore(CursorHijack.Reducers);
      let rootElement = document.getElementById('app')

      render(
        <Provider store={store}>
          <div>
            <App />
          </div>
        </Provider>,
        rootElement
      )
      ```

  5. Set more zIndex for true-cursor-overlay than all other components.

    This is because all mouse event have to be hooked by true-cursor-overlay, not by other components.
    
  6. Create and set your own distoreter.
 
    This is most important and difficult part.
    Read instruction below carefully.
    
    TODO

## Restrictions

  1. Default (real) cursor will be shown on dialogs(e.g. alert).

  Cursor-hijack hide default cursor where cursor-hijack-overlay covers, but it does not cover dialog.
  
  If you want REALITY for a pseudo cursor, recommend not to use them.
  
## Samples

This library includes some sample in [samples folder](https://github.com/aratakokubun/cursor-hijack/tree/master/samples)

These samples are run in [demo page](https://cursor-hijack-demo.appspot.com/demo)

## Future improvements

  - Distort cursor periodically even while no mouse events occur.

## License

MIT
