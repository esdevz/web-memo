import React, { useReducer, useCallback, useState, ChangeEvent } from "react";
import { exportDB, importInto, peakImportFile } from "dexie-export-import";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import FormInput from "../../../ui/form/FormInput";
import { db } from "../../store/db";
import { initialProgressState, progressReducer } from "../../store/exportReducer";
import { DATABASE } from "../../../idb/NotesDb";
import { Configs } from "../../store/types";
import { AiOutlineUpload } from "react-icons/ai";

const importFile = async (file: File) => {
  const importedFile = await peakImportFile(file);
  if (importedFile.data.databaseName !== DATABASE) {
    throw new Error("incorrect database");
  }
  const cfg = await db.getConfigs();

  await importInto(db, file, {
    overwriteValues: true,
    acceptVersionDiff: false,
  });
  //merge the overwritten configs
  const importedConfigs = await db.getConfigs();
  const configs: Configs = {
    ...importedConfigs,
    ...cfg,
    collections: {
      ...importedConfigs.collections,
      ...cfg.collections,
    },
  };
  await db.updateConfigs(1, configs);
};

const Export = () => {
  const green = useColorModeValue("green.100", "green.600");
  const shadow = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.2)");

  const [fileName, setFileName] = useState("");
  const [dragOverState, setDragOverState] = useState(false);
  const [progressState, dispatch] = useReducer(
    progressReducer,
    initialProgressState
  );

  const onFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const dragEnterHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOverState(true);
  }, []);

  const dragLeaveHandler = useCallback(() => {
    setDragOverState(false);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onFileChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      try {
        dispatch({ type: "LOADING" });
        await importFile(file);
        dispatch({ type: "SUCCESS" });
      } catch (err) {
        console.log(err);
        dispatch({ type: "ERROR", payload: "import operation failed" });
      }
    }
  };

  const dropEventHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: "LOADING" });
    setDragOverState(false);
    try {
      const item = e.dataTransfer.items[0];
      const file = item.getAsFile();
      if (file) {
        dispatch({ type: "LOADING" });
        await importFile(file);
        dispatch({ type: "SUCCESS" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "ERROR", payload: "import operation failed" });
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toLocaleString(navigator.language, {
      month: "short",
      day: "numeric",
    });
    const blob = await exportDB(db, { prettyJson: true });
    const file = new File([blob], fileName || date, { type: "application/json" });
    const url = URL.createObjectURL(file);
    browser.downloads.download({
      url,
      filename: `${fileName || date}.json`,
      saveAs: true,
    });
  };

  return (
    <>
      <Box w="full" m="1.5rem 0" as="form" onSubmit={onFormSubmit}>
        <FormInput
          w="full"
          label="Export :"
          margin="1.2rem 0"
          inputProps={{
            w: "full",
            type: "text",
            name: "fileName",
            value: fileName,
            onChange: onFileNameChange,
            placeholder: "file name",
          }}
        />
        <Button w="full" type="submit" variant="outline" colorScheme="bb">
          <Text as="h3">Download </Text>
        </Button>
      </Box>
      <VStack
        borderRadius="md"
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropEventHandler}
        onDragOver={dragOverHandler}
        border="2px dashed"
        justify="center"
        borderColor={progressState.error ? "red.500" : "bb.700"}
        h="6rem"
        w="full"
        bg={dragOverState ? shadow : progressState.completed ? green : "inherit"}
      >
        <Text as="h3" fontSize="0.87rem" pointerEvents="none" textAlign="center">
          {progressState.loading ? (
            <CircularProgress isIndeterminate size="1.5rem" />
          ) : progressState.completed ? (
            "done!"
          ) : progressState.error ? (
            progressState.message
          ) : (
            <>
              drop backup here <br />
              this will overwrite conflicting data
            </>
          )}
        </Text>
      </VStack>
      <Text as="h3" m="6px 0 0 0" fontSize="0.9rem" textAlign="center">
        OR
      </Text>
      <Button
        mt="6px"
        leftIcon={<AiOutlineUpload />}
        as="label"
        colorScheme="bb"
        w="full"
        cursor="pointer"
      >
        <Text as="h3">Import </Text>
        <Input
          onChange={onFileChangeHandler}
          display="none"
          name="file"
          type="file"
          accept=".json"
        />
      </Button>
    </>
  );
};

export default Export;
