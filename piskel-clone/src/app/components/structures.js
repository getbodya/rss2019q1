const structures = {
  appStructure: {
    parent: 'body',
    tag: 'div',
    className: 'app',
    children: [
      {
        tag: 'header',
        className: 'app__header',
        children: [
          {
            tag: 'h1',
            className: 'header__label',
            content: 'PISKELCLONE'
          }
        ],
      },
      {
        tag: 'main',
        className: 'app__main',

      },
    ],

  },
  toolsPanelStructure: {
    parent: '.app__main',
    tag: 'div',
    className: 'main__tools-panel',
    children: [
      {
        tag: 'div',
        className: 'tools-panel__size-panel',
        children: [
          {
            tag: 'div',
            className: 'size-panel__size-input one-unit',
            attr: {
              'data-size': 1,
            }
          },
          {
            tag: 'div',
            className: 'size-panel__size-input two-unit',
            attr: {
              'data-size': 2,
            }
          },
          {
            tag: 'div',
            className: 'size-panel__size-input three-unit',
            attr: {
              'data-size': 3,
            },
          },
          {
            tag: 'div',
            className: 'size-panel__size-input four-unit',
            attr: {
              'data-size': 4,
            }
          },
        ]
      },
      {
        tag: 'div',
        className: 'tools-panel__tool pen',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool tool__mirror-pen',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            children: [
              // {
              //   tag: 'span',
              //   className: 'prompt__hotkey',
              //   content: 'hotkey:',
              // },
              {
                tag: 'p',
                className: 'prompt__alt-action',
                content: '+ctrl > horisontal axis',
              },
              {
                tag: 'p',
                className: 'prompt__alt-action',
                content: '+shift > horisontal and vertical axis',
              }
            ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool eraser',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool paintBucket',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool stroke',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool circle',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            children: [
              // {
              //   tag: 'span',
              //   className: 'prompt__hotkey',
              //   content: 'hotkey:',
              // },
              {
                tag: 'p',
                className: 'prompt__alt-action',
                content: '+ctrl > fill',
              },
            ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool reactangle',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            children: [
              // {
              //   tag: 'span',
              //   className: 'prompt__hotkey',
              //   content: 'hotkey:',
              // },

              {
                tag: 'p',
                className: 'prompt__alt-action',
                content: '+ctrl > fill',
              },
            ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool move',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool lighten',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
              // {
              //   tag: 'span',
              //   className: 'prompt__hotkey',
              //   content: 'hotkey:',
              // }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool dithering',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },
      {
        tag: 'div',
        className: 'tools-panel__tool colorPicker',
        children: [
          {
            tag: 'div',
            className: 'tool__prompt',
            // children: [
            //   {
            //     tag: 'span',
            //     className: 'prompt__hotkey',
            //     content: 'hotkey:',
            //   }
            // ]
          }
        ],
      },

      {
        tag: 'div',
        className: 'tools-panel__inputs inputs__color-inputs',
        children: [
          {
            tag: 'input',
            className: 'color-inputs__primary-color primaryColor',
            attr: {
              type: 'color'
            }
          },
          {
            tag: 'input',
            className: 'color-inputs__secondary-color secondaryColor',
            attr: {
              type: 'color'
            }
          }
        ]
      },
    ],

  },
  framePanelStructure: {
    parent: '.app__main',
    tag: 'div',
    className: 'main__frame-panel',
    children: [
      {
        tag: 'div',
        className: 'frame-panel__frame-list',
      },
      {
        tag: 'button',
        className: 'frame-panel__add-new-frame-btn add-new',
        content: ' + add new frame',
      },
    ],
  },
  frameStructure: {
    into: '.frame-panel__frame-list',
    tag: 'div',
    className: 'frame-box box',
    children: [
      {
        tag: 'canvas',
        className: 'frame-box__canvas canvas'
      },
      {
        tag: 'button',
        className: 'frame-box__copy-btn copy-btn',
      },
      {
        tag: 'button',
        className: 'frame-box__delete-btn delete-btn',
        content: 'x'

      },
    ]
  },
  canvasStructure: {
    parent: '.app__main',
    tag: 'div',
    className: 'main__canvas-panel',
    children: [
      {
        tag: 'div',
        className: 'canvas-panel__box',
        children: [
          {
            tag: 'canvas',
            className: 'canvas-panel__glued-canvas',
          },
          {
            tag: 'canvas',
            className: 'canvas-panel__static-canvas',

          },
          {
            tag: 'canvas',
            className: 'canvas-panel__animation-canvas',

          },
        ]
      },
      {
        tag: 'div',
        className: 'canvas-panel__canvas-widget',
        children: [
          {
            tag: 'span',
            className: 'canvas-widget__coordinates'
          }
        ]
      }
      // {
      //   tag: 'canvas',
      //   className: 'frame-panel__add-new-frame-btn',
      //   content: ' + add new frame',
      // },
    ],
  },
  controlPanelStructure: {
    parent: '.app__main',
    tag: 'div',
    className: 'main__control-panel',
    children: [
      {
        tag: 'div',
        className: 'control-panel__preview',
      },
      {
        tag: 'div',
        className: 'control-panel__options',
      },
      {
        tag: 'div',
        className: 'control-panel__layers',
      },
    ],
  },
  optionStructure: {
    parent: '.control-panel__options',
    tag: 'div',
    className: 'preview__options-btns',
    children: [
      {
        tag: 'input',
        className: 'options-btns__open-file-btn',
        attr: {
          type: "file",
          accept: ".bdn",
        }
      },
      {
        tag: 'button',
        className: 'options-btns__export-btn',
      },
      {
        tag: 'button',
        className: 'options-btns__setting-btn',
      },
      {
        tag: 'button',
        className: 'options-btns__hotkey-btn',

      },
    ],

  },
  hotKeyWindowStructure: {
    tag: 'div',
    className: 'options__hotkey-window',
    children: [
      {
        tag: 'button',
        className: 'hotkey-window__close-btn',
        content: 'X'
      },
      {
        tag: 'ul',
        className: 'hotkey-window__hotkey-list',
      },
      {
        tag: 'button',
        className: 'hotkey-window__save-btn',
        content: 'save'
      }
    ]
  },
  hotKeyWindowElement: {
    tag: 'li',
    className: 'hotkey-list__hotkey-item',
    children: [
      {
        tag: 'h3',
        className: 'hotkey-item__name',
        content: ''
      },
      {
        tag: 'input',
        className: 'hotkey-item__input',
        attr: {
          readonly: 'readonly'
        }
      }
    ]

  },
  layerPanelStructure: {
    parent: '.control-panel__layers',
    tag: 'div',
    className: 'layers__layers-panel',
    children: [
      {
        tag: 'div',
        className: 'layers-panel__layer-btns',
        children: [
          {
            tag: 'button',
            className: 'layer-btns__add-new-btn add-new',
            content: ' + add new layer',
          },
        ]
      },
      {
        tag: 'div',
        className: 'layers-panel__layer-list',
      },
    ],
  },
  layerStructure: {
    into: '.layers-panel__layer-list',
    tag: 'div',
    className: 'layer-box box',
    children: [
      {
        tag: 'canvas',
        className: 'layer-box__canvas canvas'
      },
      {
        tag: 'button',
        className: 'layer-box__copy-btn copy-btn',
      },
      {
        tag: 'button',
        className: 'layer-box__merge-btn merge-btn',
      },
      {
        tag: 'button',
        className: 'layer-box__delete-btn delete-btn',
      },
    ]
  }
}
export default structures;
