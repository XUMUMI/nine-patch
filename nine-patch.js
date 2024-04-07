export class NinePatch {
  /**
   * 构造函数 Constructor
   *
   * @param srcUrl 图片地址 The image address
   */
  constructor(srcUrl) {
    this.srcUrl = srcUrl
  }

  /**
   * 初始化 Init
   *
   * @returns {Promise<void>}
   */
  async init() {
    this.rawContext = await getOriginalImgContext(this.srcUrl)
    /* 获取图片的宽高
    Get the width and height of the image */
    this.imageWidth = this.rawContext.canvas.width - 2
    this.imageHeight = this.rawContext.canvas.height - 2
    /* 获取 patch 数据
     * Get patch data */
    this.horizontalPatch = getHorizontalPatch(this.rawContext)
    this.verticalPatch = getVerticalPatch(this.rawContext)

    if (this.horizontalPatch && this.verticalPatch) {
      /* 创建临时画布，用于绘制 patch
       * Creates a temporary canvas for drawing patches */
      this.tempCanvas = document.createElement('canvas')
      this.tempContext = this.tempCanvas.getContext('2d')

      /* 计算原图中，不会被拉伸的宽高长度，即为固定的长度
      *  In the original image, the width and height length that will not be stretched is the fixed length */
      this.fixWidth = this.horizontalPatch.reduce((acc, cur) => acc + (cur < 0 ? -cur : 0), 0)
      this.fixHeight = this.verticalPatch.reduce((acc, cur) => acc + (cur < 0 ? -cur : 0), 0)

      this.padding = getPadding(this.rawContext)
    }
  }

  /**
   * 获取 9 patch 图片的 base64
   * Get the base64 of the 9 patch image
   *
   * @returns base64
   */
  draw(element) {
    const width = element.clientWidth
    const height = element.clientHeight
    const base64 = this.getBase64(width, height)
    if (base64) {
      if (this.padding[0] || this.padding[1] || this.padding[2] || this.padding[3]) {
        if (this.padding[0]) element.style.paddingTop = `${this.padding[0]}px`
        if (this.padding[1]) element.style.paddingRight = `${this.padding[1]}px`
        if (this.padding[2]) element.style.paddingBottom = `${this.padding[2]}px`
        if (this.padding[3]) element.style.paddingLeft = `${this.padding[3]}px`
      }
      element.style.boxSizing = 'border-box'
      element.style.backgroundSize = `${width}px ${height}px`
      element.style.backgroundRepeat = 'no-repeat'
      element.style.backgroundImage = `url('${this.getBase64(width, height)}')`
    } else element.style.backgroundImage = `url('${this.srcUrl}')`
  }

  getBase64(width, height) {
    let ret
    /* 如果符合格式要求，horizontalPatch 或 verticalPatch 会被赋值为 undefined
     If the formatting requirements are met, the horizontalPatch or verticalPatch is assigned undefined */
    if (this.horizontalPatch && this.verticalPatch) {

      /* 创建输出画布
       * Create an output canvas */
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')

      /* 计算会被拉伸部分的宽高长度，计算方式为 (目标图片长度 - 固定长度) / (图片总长度 - 固定长度)；固定的长度在原图和目标画布是一致的
       * Calculate the width and height length of the stretched part as (target image length - fixed length) / (total image length - fixed length), the fixed length is the same as the original image and the target canvas */
      const horizontalStretchRatio = (width - this.fixWidth) / (this.imageWidth - this.fixWidth)
      const verticalStretchRatio = (height - this.fixHeight) / (this.imageHeight - this.fixHeight)

      /* 初始化
       * Initialize */
      let dw = 0, dh = 0, dx = 0, dy = 0
      let sx = 1, sy = 1
      /* 遍历每一行 patch
       * Iterate through each row of patches */
      for (let row = 0; row < this.verticalPatch.length; ++row) {
        /* 将临时画布改为该行的 patch 高度
         * Change the temporary canvas to the patch height of the row */
        this.tempCanvas.height = Math.abs(this.verticalPatch[row])
        /* 遍历该行的每一列 patch，即每一个单独的 patch
         * Iterate through each column of patches in the row, i.e., each individual patch */
        for (let col = 0; col < this.horizontalPatch.length; ++col) {
          /* 将临时画布改为该 patch 宽度
           * Change the temporary canvas to that patch width  */
          this.tempCanvas.width = Math.abs(this.horizontalPatch[col])

          /* 将原图的 patch 绘制到临时画布
           * Draw the patch of the original image to the temporary canvas */
          this.tempContext.drawImage(this.rawContext.canvas, sx, sy, this.tempCanvas.width, this.tempCanvas.height, 0, 0, this.tempCanvas.width, this.tempCanvas.height)
          /* 计算目标画布的 patch 大小，如果值为正数表示可以拉伸，那么进行变形，如果为负数，那么保持原有大小；保证绘制的 patch 大小不为负数
           * Calculate the size of the patch of the target canvas, deform if the value is positive to mean that it can be stretched, keep the original size if it is negative, and ensure that the size of the patch drawn is not negative */
          dw = this.horizontalPatch[col] < 0 ? -this.horizontalPatch[col] : this.horizontalPatch[col] * Math.max(horizontalStretchRatio, 0)
          dh = this.verticalPatch[row] < 0 ? -this.verticalPatch[row] : this.verticalPatch[row] * Math.max(verticalStretchRatio, 0)
          /* 将临时画布的 patch 绘制到目标画布
           * Draw a patch of the temporary canvas to the target canvas */
          context.drawImage(this.tempCanvas, 0, 0, this.tempCanvas.width, this.tempCanvas.height, dx, dy, dw, dh)
          /* 更新目标画布的 patch 位置
           * Update the patch position of the target canvas */
          dx += dw
          /* 更新原图的 patch 位置
           * Update the patch location of the original image */
          sx += this.tempCanvas.width
        }
        /* 更新目标画布的 patch 位置
         * Update the patch position of the target canvas */
        dx = 0
        dy += dh
        /* 更新原图的 patch 位置
         * Update the patch location of the original image */
        sx = 1
        sy += this.tempCanvas.height
      }
      /* 输出 base64
       * output base64 */
      ret = canvas.toDataURL('image/png')
    }
    return ret
  }
}

/**
 * 获取原始图片的上下文
 * Get the original image context
 *
 * @param srcImg 图片地址 The image address
 * @returns 原始图片上下文 The original image context
 */
function getOriginalImgContext(srcImg) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = srcImg
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const width = img.width
      const height = img.height
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d', { willReadFrequently: true })
      context.drawImage(img, 0, 0, width, height)
      resolve(context)
    }
    img.onerror = reject
  })
}

/**
 * 获取水平 patch 大小
 * Get the horizontal patch size
 *
 * @param context 上下文 The context
 * @returns 返回数据是一个数组，数组的每个元素表示一个 patch 的大小，正数表示拉伸，负数表示固定大小
 * The return data is an array, each element of the array represents the size of a patch, a positive number means stretching, and a negative number means a fixed size
 */
function getHorizontalPatch(context) {
  const rawData = context.getImageData(1, 0, context.canvas.width - 2, 1).data
  return getPatchSize(rawData)
}

/**
 * 获取垂直 patch 大小
 * Get the vertical patch size
 *
 * @param context 上下文 The context
 * @returns 返回数据是一个数组，数组的每个元素表示一个 patch 的大小，正数表示拉伸，负数表示固定大小
 * The return data is an array, each element of the array represents the size of a patch, a positive number means stretching, and a negative number means a fixed size
 */
function getVerticalPatch(context) {
  const rawData = context.getImageData(0, 1, 1, context.canvas.height - 2).data
  return getPatchSize(rawData)
}

/**
 * 获取 padding
 * Get padding
 * @param context 上下文
 * @returns padding 数组，上右下左 padding array, top right bottom left
 */
function getPadding(context) {
  const upAndDownPaddingPixelData = context.getImageData(context.canvas.width - 1, 1, 1, context.canvas.height - 2).data
  const upAndDownPaddingSizeData = getPatchSize(upAndDownPaddingPixelData)
  const upAndDown = paddingSizeData2PaddingSize(upAndDownPaddingSizeData)
  const leftAndRightPaddingPixelData = context.getImageData(1, context.canvas.height - 1, context.canvas.width - 2, 1).data
  const leftAndRightPaddingSizeData = getPatchSize(leftAndRightPaddingPixelData)
  const leftAndRight = paddingSizeData2PaddingSize(leftAndRightPaddingSizeData)
  return [upAndDown[0], leftAndRight[1], upAndDown[1], leftAndRight[0]]
}

/**
 * 将 paddingSizeData 转换为 paddingSize
 * Convert paddingSizeData to paddingSize
 *
 * @param paddingSizeData paddingSizeData
 * @returns padding 数组，上下或左右
 * padding array, top and bottom or left and right
 */
function paddingSizeData2PaddingSize(paddingSizeData) {
  const ret = [undefined, undefined]
  switch (paddingSizeData?.length) {
    case 1:
      if (paddingSizeData[0] > 0) {
        ret[0] = 0
        ret[1] = 0
      }
      break
    case 2:
      if (paddingSizeData[0] > 0) {
        ret[0] = 0
        ret[1] = -paddingSizeData[1]
      } else {
        ret[0] = -paddingSizeData[0]
        ret[1] = 0
      }
      break
    case 3:
      if (paddingSizeData[0] < 0) {
        ret[0] = -paddingSizeData[0]
        ret[1] = -paddingSizeData[2]
      }
      break
  }
  return ret
}

/**
 * 获取 patch 的大小
 * Get the size of the patch
 *
 * @param rawData 原始数据
 * @returns 返回数据是一个数组，数组的每个元素表示一个 patch 的大小，正数表示拉伸，负数表示固定大小
 * The return data is an array, each element of the array represents the size of a patch, a positive number means stretching, and a negative number means a fixed size
 */
function getPatchSize(rawData) {
  let ret = undefined
  if (rawData.length >= 4 && rawData.length % 4 === 0) {
    ret = []
    let dataIndex = 0
    let patchIndex = 0
    ret[patchIndex] = 255 === rawData[dataIndex + 3] ? 1 : -1
    for (let dataIndex = 4; dataIndex < rawData.length; dataIndex += 4) {
      if (0 !== rawData[dataIndex] || 0 !== rawData[dataIndex + 1] || 0 !== rawData[dataIndex + 2] || (rawData[dataIndex + 3] !== 255 && rawData[dataIndex + 3] !== 0)) {
        ret = undefined
        break
      }
      const isStretch = 255 === rawData[dataIndex + 3]
      if ((ret[patchIndex] > 0) !== isStretch) ret[++patchIndex] = 0
      ret[patchIndex] += isStretch ? 1 : -1
    }
    if (1 === ret?.length && 0 >= ret[0]) ret = undefined
  }
  return ret
}
