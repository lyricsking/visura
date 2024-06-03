import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

type BlocksContextType = [Block[] | null, Dispatch<SetStateAction<Block[] | null>>];

const BlocksContext = createContext<BlocksContextType | null>(null);

const isValidBlock = (value: unknown) =>
  Object.values(Block).find((v) => v === value) !== undefined;

function BlocksProvider({
  children,
  block: pBlocks,
}: PropsWithChildren<{ block: Blocks[] | null }>) {
  const [blocks, setBlocks] = useState<Block[] | null>(() => {
    if (pBlocks) {
      //if (isValidBlock(pBlocks)) {
        return pBlocks;
      //}
    }
    
    return Block.Avatar;
    
  });
  
  // Fetcher used to post a request to server to persist blocks value
  const persistBlocks = useFetcher();

  // Flag to identify when this is mounted
  const mountRun = useRef(false);
  // useEffect to auto-update blocks value in server when a new value is detected.
  useEffect(() => {
    // useEffect will run when provider is first mounted,
    // even though no block change occurred
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }

    if (!blocks) {
      return;
    }
    // A new blocks value is detected, we should persist to server
    persistBlocks.submit(
      { blocks },
      { action: "/pages/blocks", method: "post" }
    );
  }, [blocks]);

  return (
    <BlocksContext.Provider value={[theme, setTheme]}>
      {children}
    </BlocksContext.Provider>
  );
}

function useBlocks() {
  const context = useContext(BlocksContext);
  if (context === undefined) {
    throw new Error("useBlocks must be used within a BlocksProvider");
  }
  return context;
}

export { Block, BlocksProvider, isValidBlock, useBlocks };