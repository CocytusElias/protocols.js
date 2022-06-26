export class Interceptor<V> {
  protected intercepts: {
    onfulfilled?: (value: V) => V | Promise<V>;
    onRejected?: (error: any) => any;
  }[];

  // 初始化
  constructor() {
    this.intercepts = [];
  }

  // 拦截器增加
  public add(
    onfulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any,
  ): number {
    this.intercepts.push({ onfulfilled, onRejected });
    return this.intercepts.length - 1;
  }

  // 拦截器删除
  public deleteFulfill(id: number) {
    if (this.intercepts.length > id && id >= 0 && this.intercepts[id] != null) {
      delete this.intercepts[id].onfulfilled;
    }
  }

  public deleteReject(id: number) {
    if (this.intercepts.length > id && id >= 0 && this.intercepts[id] != null) {
      delete this.intercepts[id].onRejected;
    }
  }

  public delete(id: number) {
    this.deleteFulfill(id);
    this.deleteReject(id);
  }

  // 拦截器替换
  public replaceFulfill(id: number, onfulfilled: (value: V) => V | Promise<V>) {
    if (this.intercepts.length > id && id >= 0 && this.intercepts[id] != null) {
      this.intercepts[id].onfulfilled = onfulfilled;
    }
  }

  public replaceReject(id: number, onRejected: (error: any) => any) {
    if (this.intercepts.length > id && id >= 0 && this.intercepts[id] != null) {
      this.intercepts[id].onRejected = onRejected;
    }
  }

  public replace(
    id: number,
    onfulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any,
  ) {
    if (onfulfilled) {
      this.replaceFulfill(id, onfulfilled);
    }
    if (onRejected) {
      this.replaceReject(id, onRejected);
    }
  }

  // 拦截器执行
  public execute(value: V): Promise<V> {
    const promise = Promise.resolve(value);
    this.intercepts.forEach((item) => {
      promise.then(item.onfulfilled, item.onRejected);
    });
    return promise;
  }
}
