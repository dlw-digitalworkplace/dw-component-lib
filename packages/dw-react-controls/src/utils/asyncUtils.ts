export namespace AsyncUtils {
	export const actAsSync = (fn: () => Generator<unknown, any, unknown>) => {
		const iterator = fn();
		const loop = (result: any) => {
			!result.done &&
				result.value.then(
					(res: any) => loop(iterator.next(res)),
					(err: any) => loop(iterator.throw(err))
				);
		};

		loop(iterator.next());
	};
}
