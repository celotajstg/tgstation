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
import { logger } from '../logging';
export class AlertModal extends Component {
  constructor() {
    super();
    this.buttonRef = createRef();
  }

  componentDidMount() {
    const button = this.buttonRef.current;
    setTimeout(() => button.focus(), 1);
  }

  render() {
    const { act, data } = useBackend(this.context);
    const { title, message, buttons, timeout } = data;

    return (
      <Window title={title} width={350} height={150} canClose={timeout > 0}>
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
                      <Button
                        ref={buttonIndex === 0 ? this.buttonRef : null}
                        px={3}
                        onClick={() => act("choose", { choice: button })}>
                        {button}
                      </Button>
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
