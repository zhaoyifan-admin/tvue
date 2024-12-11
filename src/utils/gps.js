/** 不同坐标系装换规则*/
const pi = 3.1415926535897932384626;
const xpi = 3.14159265358979324 * 3000.0 / 180.0;
const a = 6378245.0;
const ee = 0.00669342162296594323;

function transformLat(x, y) {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y +
        0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformLon(x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 *
        Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 *
        pi)) * 2.0 / 3.0;
  return ret;
}

function transform(lon, lat) {
  if (outOfChina(lon, lat)) {
    return [lon, lat];
  }
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  let radLat = lat / 180.0 * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  let sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
  let mgLat = lat + dLat;
  let mgLon = lon + dLon;
  return [mgLon, mgLat];
}

function outOfChina(lon, lat) {
  if (lon < 72.004 || lon > 137.8347) {return true;}
  return lat < 0.8293 || lat > 55.8271;

}

function retain6(num) {
  return parseFloat(num.toFixed(6));
}

/**
 * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System
 *
 * @param lat
 * @param lon
 * @return
 */
export function gps84ToGcj02(lon, lat) {
  if (outOfChina(lon, lat)) {
    return [lon, lat];
  }
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  let radLat = lat / 180.0 * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  let sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
  let mgLat = retain6(lat + dLat);
  let mgLon = retain6(lon + dLon);
  return [mgLon, mgLat];
}

/**
 * * 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return
 * */
export function gcj02ToGps84(lon, lat) {
  let gps = transform(lon, lat);
  let mgLon = lon * 2 - gps[0];
  let mgLat = lat * 2 - gps[1];
  return [mgLon, mgLat];
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
 *
 * @param lat
 * @param lon
 */
export function gcj02ToBd09(lon, lat) {
  // eslint-disable-next-line one-var
  let x = lon, y = lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xpi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xpi);
  let mgLon = z * Math.cos(theta) + 0.0065;
  let mgLat = z * Math.sin(theta) + 0.006;
  return [mgLon, mgLat];
}

/**
 * * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param
 * bdlat * @param bdlon * @return
 */
function bd09ToGcj02(lon, lat) {
  // eslint-disable-next-line one-var
  let x = lon - 0.0065, y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xpi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xpi);
  let mgLon = z * Math.cos(theta);
  let mgLat = z * Math.sin(theta);
  return [mgLon, mgLat];
}

/** 将gps84转为bd09
 * @param lat
 * @param lon
 * @return
 */
export function gps84Tobd09(lon, lat) {
  let gcj02 = gps84ToGcj02(lon, lat);
  return gcj02ToBd09(gcj02[0], gcj02[1]);
}

export function bd09Togps84(lon, lat) {
  let gcj02 = bd09ToGcj02(lon, lat);
  let gps84 = gcj02ToGps84(gcj02[0], gcj02[1]);
  // 保留小数点后六位
  gps84[0] = retain6(gps84[0]);
  gps84[1] = retain6(gps84[1]);
  return gps84;
}
