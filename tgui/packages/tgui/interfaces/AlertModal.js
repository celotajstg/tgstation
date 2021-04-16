/**
 * @file
 * @copyright 2020 bobbahbrown (https://github.com/bobbahbrown)
 * @license MIT
 */

import { clamp01 } from 'common/math';
import { useBackend } from '../backend';
import { Component, createRef } from 'inferno';
import { Box, Button, Flex, Section } from '../components';
import { Window } from '../layouts';
import { createLogger } from '../logging';

const modalLogger = createLogger('blungus');
export class AlertModal extends Component {
  constructor() {
    super();
    this.buttonRef = createRef();
  }

  componentDidMount() {
    const button = this.buttonRef.current;
    modalLogger.log(button)
    setTimeout(() => button.focus(), 1);
  }

  render() {
    const { act, data } = useBackend(this.context);
    const { title, message, buttons, timeout } = data;

    return (
      <Window title={title} width={350} height={150}>
        {timeout && <Loader value={timeout} />}
        <Window.Content>
          <Section fill>
            <Flex direction="column" height="100%">
              <Flex.Item grow={1}>
                <Flex
                  direction="column"
                  className="AlertModal__Message"
                  height="100%">
                  <Flex.Item>
                    <Box m={1}>
                      {message}
                    </Box>
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item my={2}>
                <Flex className="AlertModal__Buttons">
                  {buttons.map((button, buttonIndex) => (
                    <Flex.Item key={buttonIndex} mx={1}>
                      <div
                        ref={buttonIndex === 0 ? this.buttonRef : null}
                        className="Button Button--color--default"
                        px={3}
                        onClick={() => act("choose", { choice: button })}>
                        {button}
                      </div>
                    </Flex.Item>
                  ))}
                </Flex>
              </Flex.Item>
            </Flex>
          </Section>
        </Window.Content>
      </Window>
    );
  }

}

export const Loader = props => {
  const { value } = props;

  return (
    <div className="AlertModal__Loader">
      <Box
        className="AlertModal__LoaderProgress"
        style={{ width: clamp01(value) * 100 + '%' }} />
    </div>
  );
};
