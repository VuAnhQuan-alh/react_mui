import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import 'react-virtualized/styles.css';

interface IProps {
  above?: boolean;
  backdrop?: boolean;
  children: ReactNode;
}

const Overlay = (props: IProps) => {
  const { above = false, backdrop = false, children } = props;
  return (
    <Wrapper above={above}>
      {({ width, height }) => (
        <Box
          sx={{
            display: 'grid',
            placeContent: 'center',
            top: '50%',
            left: '50%',
            width: width - 2,
            height: height - 15,
            ...(backdrop && {
              bgcolor: alpha('rgba(255, 255, 255)', 0.38),
            }),
          }}
        >
          {children}
        </Box>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(AutoSizer, {
  shouldForwardProp: (prop: string) => !['above'].includes(prop),
})<Pick<IProps, 'above'>>(({ theme, above }) => ({
  position: 'sticky',
  inset: 0,
  ...(above && {
    zIndex: theme.zIndex.appBar + 3,
  }),
}));

export default Overlay;
