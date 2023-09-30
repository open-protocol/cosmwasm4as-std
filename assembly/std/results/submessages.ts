import { JSON } from "json-as/assembly";
import { CosmosMsg } from "./cosmos_msg";
import { Event } from "./events";

export type ReplyOn = string;

const UNUSED_MSG_ID: u64 = 0;

// @ts-ignore
@json
export class SubMsg {
  id: u64;
  msg: CosmosMsg;
  gas_limit: u64;
  reply_on: ReplyOn;

  constructor(id: u64, msg: CosmosMsg, replyOn: ReplyOn) {
    this.id = id;
    this.msg = msg;
    this.reply_on = replyOn;
    this.gas_limit = 0;
  }

  public static replyNever(msg: CosmosMsg): SubMsg {
    return this.replyOn(msg, UNUSED_MSG_ID, "never");
  }

  public static replyOnSuccess(msg: CosmosMsg, id: u64): SubMsg {
    return this.replyOn(msg, id, "success");
  }

  public static replyOnError(msg: CosmosMsg, id: u64): SubMsg {
    return this.replyOn(msg, id, "error");
  }

  public static replyAlways(msg: CosmosMsg, id: u64): SubMsg {
    return this.replyOn(msg, id, "always");
  }

  public withGasLimit(limit: u64): SubMsg {
    this.gas_limit = limit;
    return this;
  }

  static replyOn(msg: CosmosMsg, id: u64, replyOn: ReplyOn): SubMsg {
    return new SubMsg(id, msg, replyOn);
  }
}

// @ts-ignore
@json
export class Reply {
  id: u64;
  result: SubMsgResult;
}

// @ts-ignore
@json
export class SubMsgResult {
  ok: SubMsgResponse;
  err: string;
}

// @ts-ignore
@json
export class SubMsgResponse {
  events: Array<Event>;
  data: ArrayBuffer | null;
}