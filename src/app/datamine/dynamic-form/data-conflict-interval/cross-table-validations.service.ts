import { Injectable } from '@angular/core';
import { DataRepository } from '@database/workspace';
import { DataModel } from '@shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CrossTableValidationsService {
	public constructor(private dataRepository: DataRepository) { }

	public checkIntervalRelated$(
		depthFrom: string,
		depthTo: string,
		tableName: string,
		projectNumber: string,
		primaryKey: string,
		primaryKeyValue: string): any/*Observable<{ [key: string]: string } | DataModel[]>*/ {

		return this.dataRepository.getChildTableData$(tableName, projectNumber, primaryKey, primaryKeyValue)
			.pipe(
				map((tableData: DataModel[]) => {
					let fromFlag = false;
					let toFlag = false;

					let fromFlagWrap = false;
					let toFlagWrap = false;

					let from: number;
					let to: number;
					const intervalsFound: DataModel[] = [];
					const checkResult: { [key: string]: any }[] = [];

					if (tableData.length === 0) {
						return { noIntervalSet: 'true' };
					}

					if (tableData[0]?.depth_from >= Number(depthFrom) &&
						tableData[0]?.depth_to <= Number(depthTo)) {
						console.log('Interval not set before FROM: ', tableData[0]?.depth_from);
					}

					if (tableData[tableData.length - 1]?.depth_to <= Number(depthTo) &&
						tableData[tableData.length - 1]?.depth_from <= Number(depthFrom)) {
						console.log('Interval not set after TO: ', tableData[tableData.length - 1]?.depth_to);
					}

					tableData
						.sort((tableEntry1, tableEntry2) => tableEntry1.depth_from - tableEntry2.depth_from)
						.forEach((tableEntry: DataModel) => {
							console.log(tableEntry);
							// if (checkResult) {
							// 	return;
							// }
							fromFlag =
								tableEntry.depth_from <= Number(depthFrom) &&
									Number(depthFrom) < tableEntry.depth_to ?
									true : false;
							toFlag = tableEntry.depth_to >= Number(depthTo) &&
								Number(depthTo) > tableEntry.depth_from ?
								true : false;

							fromFlagWrap =
								tableEntry.depth_from >= Number(depthFrom) &&
									Number(depthFrom) < tableEntry.depth_to ?
									true : false;
							toFlagWrap = tableEntry.depth_to <= Number(depthTo) &&
								Number(depthTo) > tableEntry.depth_from ? true : false;

							from = tableEntry.depth_from;
							to = tableEntry.depth_to;

							console.log('------- FLAGS DEFAULT -------');
							console.log('fromFlag: ', fromFlag);
							console.log('toFlag: ', toFlag);
							console.log('fromFlagWrap: ', fromFlagWrap);
							console.log('toFlagWrap: ', toFlagWrap);
							console.log('from: ', from);
							console.log('to: ', to);

							if (fromFlag && fromFlag === toFlag) {
								console.log('------- FLAGS EQUAL -------');
								console.log('fromFlag: ', fromFlag);
								console.log('toFlag: ', toFlag);
								console.log('from: ', from);
								console.log('to: ', to);
								intervalsFound.push(tableEntry);
							}

							if (fromFlag !== toFlag) {
								console.log('------- FLAGS DIFFER -------');
								console.log('fromFlag: ', fromFlag);
								console.log('toFlag: ', toFlag);
								console.log('from: ', from);
								console.log('to: ', to);

								checkResult.push(fromFlag ? { overlapOnTo: tableEntry } : { overlapOnFrom: tableEntry });
							}

							if (fromFlagWrap && fromFlagWrap === toFlagWrap) {
								console.log('------- FLAGS WRAP EQUAL -------');
								console.log('fromFlag: ', fromFlag);
								console.log('toFlag: ', toFlag);
								console.log('fromFlagWrap: ', fromFlagWrap);
								console.log('toFlagWrap: ', toFlagWrap);
								console.log('from: ', from);
								console.log('to: ', to);

								checkResult.push({ overlapOnFromTo: tableEntry });
							}
						});

					return {
						intervalsFound,
						checkResult
					};
				})
			);
	}

	// public checkIntervalRelated$(
	// 	depthFrom: string,
	// 	depthTo: string,
	// 	isMinor: boolean): IntervalRelatedType {

	// 	let fromFlag = false;
	// 	let toFlag = false;
	// 	let fromFlagWrap = false;
	// 	let toFlagWrap = false;
	// 	let flagGap = false;
	// 	let intervalCheckResult: IntervalRelatedType;

	// 	if (this.dataSubscription) {
	// 		this.dataSubscription.unsubscribe();
	// 	}

	// 	const dataObject = isMinor ? this.dataObjectHIMinor : this.dataObjectHIMajor;

	// 	// console.log('isMinorCheck: ', isMinor);
	// 	console.log('dataObject: ', dataObject);
	// 	dataObject.sort((tableEntry1, tableEntry2) => tableEntry1.depth_from - tableEntry2.depth_from);

	// 	if (dataObject.length === 0) {
	// 		console.log('no data');
	// 		intervalCheckResult = { intervalError: ValidationKeys.crossTableValidationTypes.noIntervalSet };
	// 		return intervalCheckResult;
	// 	}

	// 	if (dataObject[0]?.depth_from > Number(depthFrom)) {
	// 		intervalCheckResult = { intervalError: ValidationKeys.crossTableValidationTypes.intervalNotSetBefore };
	// 		return intervalCheckResult;
	// 	}

	// 	if (dataObject[dataObject.length - 1]?.depth_to < Number(depthTo)) {
	// 		intervalCheckResult = { intervalError: ValidationKeys.crossTableValidationTypes.intervalNotSetAfter };
	// 		return intervalCheckResult;
	// 	}

	// 	// eslint-disable-next-line @typescript-eslint/prefer-for-of
	// 	for (let index = 0; index < dataObject.length; index++) {
	// 		const nextIndex = index + 1;
	// 		const tableEntry = dataObject[index];
	// 		const nextTableEntry = dataObject[nextIndex];

	// 		fromFlag =
	// 			tableEntry.depth_from <= Number(depthFrom) &&
	// 				Number(depthFrom) < tableEntry.depth_to ?
	// 				true : false;
	// 		toFlag =
	// 			tableEntry.depth_to >= Number(depthTo) &&
	// 				Number(depthTo) > tableEntry.depth_from ?
	// 				true : false;
	// 		fromFlagWrap =
	// 			tableEntry.depth_from >= Number(depthFrom) &&
	// 				Number(depthFrom) < tableEntry.depth_to ?
	// 				true : false;
	// 		toFlagWrap =
	// 			tableEntry.depth_to <= Number(depthTo) &&
	// 				Number(depthTo) > tableEntry.depth_from ?
	// 				true : false;
	// 		flagGap =
	// 			nextTableEntry &&
	// 				tableEntry.depth_to <= Number(depthFrom) &&
	// 				Number(depthTo) < nextTableEntry.depth_from ?
	// 				true : false;

	// 		if (fromFlag && fromFlag === toFlag) {
	// 			intervalCheckResult = { intervalFound: true };
	// 			return intervalCheckResult;
	// 		}

	// 		if (fromFlag !== toFlag) {
	// 			intervalCheckResult = { intervalError: ValidationKeys.crossTableValidationTypes.intervalOverlap };
	// 			return intervalCheckResult;
	// 		}

	// 		if (fromFlagWrap && fromFlagWrap === toFlagWrap) {
	// 			intervalCheckResult = { intervalError: ValidationKeys.crossTableValidationTypes.intervalOverlap };
	// 			return intervalCheckResult;
	// 		}

	// 		if (flagGap) {
	// 			intervalCheckResult = { intervalError: ValidationKeys.crossTableValidationTypes.intervalGap };
	// 			return intervalCheckResult;
	// 		}
	// 	}

	// 	return intervalCheckResult;
	// }

}
