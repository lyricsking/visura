import * as PrismaClient from "@prisma/client";
import Block, { BlockProps } from "./block";

export type PageProps = {
  id: string,
  name?: string,
  blocks: BlockProps[]
}

export default function Page({ id, type, blocks }: PageProps){
  const savePage = (mProps: BlockProps)=>{
    let page = { id, type, blocks: mProps }
    
  }
  
  return (
    <div className="h-[100%] flex flex-col p-2">
      {/**JSON.stringify(elements)*/}
      {elements.map((props) => (
        <Block key={props.id} {...props} />
      ))}
    </div>
  );
}