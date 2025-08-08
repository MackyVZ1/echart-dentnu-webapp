import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);
export default dayjs;
