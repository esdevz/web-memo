import { GridItem } from "@chakra-ui/layout";
import styled from "@emotion/styled";

const Separator = styled(GridItem)`
  display: flex;
  align-items: center;
  &:before {
    content: "";
    width: 1%;
    margin-inline: 1ch;
    border-bottom: 1px solid rgba(128, 128, 128, 0.34);
  }
  &:after {
    content: "";
    width: 90%;
    margin-left: 1ch;
    border-bottom: 1px solid rgba(128, 128, 128, 0.34);
  }
`;
export default Separator;
