import React from "react"
declare module "react" {
  type RenderFunction<T> = T extends {
    children?: infer Child
  }
    ? Child extends AnyFunctor | undefined
      ? Child
      : T & { brand: "NEVER" }
    : T & { brand: "never" }
  export type RFType<
    T extends React.ComponentType
  > = T extends React.ComponentClass<infer Props>
    ? RenderFunction<Pick<Props, "children">>
    : T extends React.FunctionComponent<infer Props>
    ? RenderFunction<Pick<Props, "children">>
    : never & { brand: "NO" }
  export abstract class DispatchComponent<
    Props,
    R extends React.Reducer<any, any>,
    State extends React.ReducerState<R>,
    I
  > extends React.Component<
    Props & {
      initializer: (arg: I & React.ReducerState<R>) => React.ReducerState<R>
    },
    State
  > {
    public abstract reducer: R
    public dispatch(actions: React.ReducerAction<R>, cb?: VoidFunctor<[]>): void

    public setStateAsync(
      dispatch: ArgumentType<
        DispatchComponent<Props, R, State, I>["setState"]
      >[0]
    ): Promise<void>

    public onMount?(): void
  }
  export type RFArgs<T> = ArgumentType<RenderFunction<T>>
  export type PropsType<T extends React.ComponentType> = ReactPropsType<T>
  export as namespace React
}
