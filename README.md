# cursor-hijack

TODO

## What is cursor-hijack?

TODO

## Why use cursor-hijack?

TODO

## How to use cursor-hijack?

  1. install cursor-hijack with npm

    npm install cursor-hijack --save

  2. Add 2 react components to your application.

      You need to pass function to CursorHijackOverlay to get Refs under application.
        ```app.js(for exapmle)
          // Import components from cursor-hijack
          import { CursorHijackOverlay, PseudoCursor } from 'cursor-hijack';
          ...

          // Pass function to get refs under app.js
          const getAppRefs = () => (this.refs)

          ...
          const render = () => {
            cursorPos: {/*your own styles here*/
              top: 0,
              left: 0,
              width: 16,
              height: 24,
              zIndex: 100
            },
            overlayPos: {/*your own styles here*/
              top: 0,
              left: 0,
              widthPercent: 100,
              heightPercent: 100,
              zIndex: 102
            },
            return
              <div>
                <PseudoCursor
                  cursorImageUrl={cursorImage/*your own cursor image here*/} 
                  pos={cursorPos}/>
                <CursorHijackOverlay
                  getAppRefs={this.getAppRefs}
                  pos={overlayPos}
                <Components /*other components*/ />
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

     // TODO

  5. Set more zIndex for true-cursor-overlay than all other components.

    This is because all mouse event have to be hooked by true-cursor-overlay, not by other components.

## Restrictions

  1. Default (real) cursor will be shown on dailogs(e.g. alert).

    If you want REALITY for a pseudo cursor, recommend not to use them.

## Future improvements

  1. Distort cursor periodically

    We will support distorting cursor periodically.

  2. Distort cursor based on amount of move

    We will support distorting cursor using amout of move.