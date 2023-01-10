export interface UseCase<IRequest = unknown, IResponse = unknown> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
