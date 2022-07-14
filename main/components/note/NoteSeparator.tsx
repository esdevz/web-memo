import { GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Separator = styled(GridItem)`
  display: flex;
  align-items: center;
  &:before {
    content: "";
    width: 1%;
    margin-inline: 1ch;
    border-bottom: 1px solid var(--border);
  }
  &:after {
    content: "";
    width: 90%;
    margin-left: 1ch;
    border-bottom: 1px solid var(--border);
  }
`;
export default Separator;
