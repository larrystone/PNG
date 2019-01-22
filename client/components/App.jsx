import React from 'react';
import Terminal from 'react-console-emulator';
import { welcomeMessage, promptLabel } from '../constants';
import image from '../images/term.jpeg';
import Actions from '../actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.terminal = React.createRef();
  }

  render() {
    const commands = {
      list: {
        description: 'Get a list of number batches',
        usage: 'list',
        fn: Actions.getAll.bind({ terminal: this.terminal })
      },
      generate: {
        description: 'Generate a batched list of numbers (default 50 numbers)',
        usage: 'generate -n number',
        fn: Actions.generate.bind({ terminal: this.terminal })
      },
      get: {
        description: 'Get a list of numbers from a batch',
        usage: 'get batchId',
        fn: Actions.get.bind({ terminal: this.terminal })
      },
      delete: {
        description: 'Delete a batch of numbers',
        usage: 'delete batchId',
        fn: Actions.delete.bind({ terminal: this.terminal })
      }
    }

    return (
      <div className="">
        <header>
          PNG - Phone Number Generator
        </header>
        <div className="main">
          <Terminal
            ref={this.terminal}
            autoFocus
            dangerMode
            disableOnProcess
            commands={commands}
            welcomeMessage={welcomeMessage}
            promptLabel={promptLabel}
            className={'terminal'}
            background={`url(${image})`}
            contentFontFamily={'"Courier New", Courier, monospace'}
          />
        </div>
        <footer>
          &lt; Larrystone - Aspiring software developer /&gt;
        </footer>
      </div>
    )
  }
}
