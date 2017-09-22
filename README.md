# Restrictions

1. You need to put refs tags for components inside.
  This library search elements with ref tag to dispatch event.

    In app.js and same manner for all child components.
      ```html
        <div>
          <ChildComponent1 ref="child1"> Good! </ChildComponent1>
          <ChildComponent2> Bad! You should not do this! </ChildComponent2>
          <button ref="button1"> Good! </button>
          <div>
            <ChildComponent3 ref="child3"> Good! </ChildComponent3>
            <button ref="button2"> Good! </button>
          </div>
        </div>
      ```

  To add to this, you need to specify { withRef: true } for comoponets which use connect.

      ```js
        connect(mapStateFunc, mapDispatchFunc, mergeFunc, { withRef: true } /*Need option*/)(Component1)
      ```

2. set more zIndex for true-cursor-overlay than all other components.
  This is because all mouse event have to be hooked by true-cursor-overlay, not by other components.